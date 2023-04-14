using System.Collections.Generic;
using Application.ViewModels;
using Infrastructure.EF;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAPI.MockFactory.Tests.Data;
using WebAPI.MockFactory.Tests.Factory.Interfaces;
using WebAPI.MockFactory.Tests.Utils;
using Xunit;

namespace WebApi.Tests.PositionsController
{
    public class DemoTest : BaseTest
    {
        [Fact]
        public void TestCase()
        {
            // Arrange
            IDatabaseInitializer databaseInitializer = TestDataFactory.CreateDatabaseInitializer();
            databaseInitializer.InitializeDatabase((ILogger<DatabaseInitializer> logger, DatabaseContext databaseContext) =>
            {
                databaseContext.AddRange(TestPositions.AllPositions);
                databaseContext.SaveChanges();
            });

            IControllerFactory controllerFactory = TestDataFactory.CreateControllerFactory();
            Controllers.PositionsController positionsController = controllerFactory.CreatePositionsController();

            // Act
            var result = positionsController.GetAll();
            var successResult = result.Result as OkObjectResult;
            var listOfPositions = successResult.Value as List<PositionDto>;

            // Assert
            Assert.Equal(TestPositions.AllPositions.Count, listOfPositions.Count);
        }
    }
}
